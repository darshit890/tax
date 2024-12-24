import { NextRequest, NextResponse } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { phoneNumber, panNumber, address, jobRole } = await request.json()

    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.given_name && user.family_name
          ? `${user.given_name} ${user.family_name}`.trim()
          : user.given_name || user.family_name || undefined
      },
    })

    const profile = await prisma.profile.upsert({
      where: { userId: dbUser.id },
      update: {
        phoneNumber,
        panNumber,
        address,
        jobRole,
      },
      create: {
        phoneNumber,
        panNumber,
        address,
        jobRole,
        userId: dbUser.id,
      },
    })

    return NextResponse.json(profile, { status: 200 })
  } catch (error) {
    console.error('Error creating/updating profile:', error)
    return NextResponse.json(
      { error: 'Error creating/updating profile' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { profile: true }
    })

    if (!dbUser || !dbUser.profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json(dbUser.profile, { status: 200 })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Error fetching profile' },
      { status: 500 }
    )
  }
}

