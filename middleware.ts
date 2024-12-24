import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function middleware(request: NextRequest) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    return NextResponse.next()
  }

  const user = await getUser()
  
  if (!user || !user.email) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }

  // Always check for profile completion, except for the onboarding page
  if (request.nextUrl.pathname !== '/onboarding') {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/profile`, {
        headers: {
          'Cookie': request.headers.get('Cookie') || '',
        },
      })
      
      if (response.status === 404) {
        console.log('Profile not found, redirecting to onboarding')
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error checking profile:', error)
      // On error, redirect to onboarding as a safety measure
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding']
}

