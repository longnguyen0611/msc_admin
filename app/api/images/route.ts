import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const folder = searchParams.get('folder') || ''
    const tags = searchParams.get('tags')?.split(',') || []
    const limit = parseInt(searchParams.get('limit') || '50')
    const nextCursor = searchParams.get('next_cursor')

    // Xây dựng expression cho tìm kiếm
    let expression = 'resource_type:image'
    
    if (folder) {
      expression += ` AND folder:${folder}*`
    }
    
    if (tags.length > 0) {
      const tagQuery = tags.map(tag => `tags:${tag}`).join(' AND ')
      expression += ` AND (${tagQuery})`
    }

    // Tìm kiếm resources
    const result = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .max_results(limit)
      .next_cursor(nextCursor || undefined)
      .execute()

    return NextResponse.json({
      success: true,
      data: {
        resources: result.resources,
        next_cursor: result.next_cursor,
        total_count: result.total_count
      }
    })

  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch images',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}