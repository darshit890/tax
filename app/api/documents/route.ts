import { NextRequest, NextResponse } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const documents = await prisma.document.findMany({
      where: { userId: dbUser.id },
      orderBy: { upload_date: 'desc' },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Error fetching documents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email }
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { name, type, fileUrl } = await request.json()

    if (!name || !type || !fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const document = await prisma.document.create({
      data: {
        name,
        type,
        file_path: fileUrl,
        userId: dbUser.id,
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Error creating document' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    
    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Missing document ID' },
        { status: 400 }
      )
    }

    // Verify document belongs to user before deleting
    const document = await prisma.document.findFirst({
      where: {
        id,
        user: {
          email: user.email
        }
      }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.document.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json(
      { error: 'Error deleting document' },
      { status: 500 }
    )
  }
}

