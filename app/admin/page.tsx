// 'use client'

// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { Download } from 'lucide-react'
// import { formatDate } from '@/lib/utils'
// import { toast } from 'sonner'

// interface Document {
//   id: string
//   name: string
//   type: string
//   file_path: string
//   upload_date: string
//   user: {
//     name: string
//     email: string
//   }
// }

// export default function AdminPage() {
//   const [documents, setDocuments] = useState<Document[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDocuments()
//   }, [])

//   const fetchDocuments = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (!user) {
//         toast.error('Unauthorized')
//         return
//       }

//       const response = await fetch('/api/admin/documents')
//       if (!response.ok) {
//         throw new Error('Failed to fetch documents')
//       }
//       const data = await response.json()
//       setDocuments(data)
//     } catch (error) {
//       console.error('Error fetching documents:', error)
//       toast.error('Failed to fetch documents')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return <div className="text-center">Loading documents...</div>
//   }

//   return (
//     <div className="container mx-auto py-8 space-y-8">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       <div className="space-y-4">
//         {documents.map((doc) => (
//           <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold">{doc.name}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Type: {doc.type} | Uploaded: {formatDate(doc.upload_date)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   User: {doc.user.name} ({doc.user.email})
//                 </p>
//               </div>
//               <Button variant="outline" size="sm" onClick={() => window.open(doc.file_path)}>
//                 <Download className="h-4 w-4 mr-2" />
//                 Download
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

