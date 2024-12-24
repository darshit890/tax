import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation'
import { OnboardingForm } from '@/components/onboarding/onboarding-form'
import prisma from '@/lib/db'
import { Progress } from "@/components/ui/progress"

export default async function OnboardingPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.email) {
    redirect('/api/auth/login')
  }

  // Check if the user already has a profile
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { profile: true }
  })

  if (existingUser?.profile) {
    redirect('/dashboard/documents')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Complete Your Profile
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              We need a few more details to get you started
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress value={33} className="w-full" />
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">Step 1 of 3</p>
          </div>

          <OnboardingForm />
        </div>
      </div>
    </div>
  )
}

