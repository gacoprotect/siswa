import React from 'react'

const Section = ({
    title,
    children
}: {
    title: string,
    children: React.ReactNode
}) => (
    <div className='space-y-2'>
        <h2 className='border-l-4 border-blue-500 bg-blue-100 text-lg font-semibold p-2'>
            {title}
        </h2>
        {children}
    </div>
)

export default Section