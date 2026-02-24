// Timeline content data - Update this file to manage Evolution Timeline content
// This file can be modified by admins and leads to update the timeline

export interface MediaItem {
    type: "image" | "video"
    url: string
    thumbnail?: string // For videos, optional thumbnail image
    caption?: string
    date?: string // Event date
    location?: string // Where photo was taken
    photographer?: string // Photo credit
    aspectRatio?: string // "16:9", "4:3", "square", etc.
    tags?: string[] // Searchable tags
}

export interface Speaker {
    name: string
    title: string // e.g. "Associate Professor, SOA University"
    image?: string // Profile image URL
    bio: string
}

export interface Subsection {
    id: string
    title: string
    description: string
    date?: string // Event date
    time?: string // Event time (e.g., "04:30 PM - 06:00 PM IST")
    location?: string // Event location
    attendees?: number // Number of participants
    speaker?: Speaker
    highlights?: string[] // Key highlights
    media: MediaItem[]
}

export interface TimelineSection {
    id: string
    title: string
    subtitle: string
    color: "primary" | "secondary" | "accent"
    date?: string // Event date (for sections without subsections)
    time?: string // Event time
    location?: string // Event location
    attendees?: number // Number of participants
    speaker?: Speaker
    subsections?: Subsection[]
    media?: MediaItem[]
}

// TIMELINE DATA
// To update the timeline, edit the sections below:
// - Add new subsections by adding objects to the subsections array
// - Add media by adding objects to the media array
// - Upload media files to /public/timeline/ directory

export const timelineData: TimelineSection[] = [
    {
        id: "foundation",
        title: "Chapter Foundation",
        subtitle: "Orientation",
        color: "primary",
        date: "November 7, 2025",
        time: "—",
        location: "—",
        // Direct media for sections without subsections
        media: [
            {
                type: "image",
                url: "/timeline/orientation/meeting-1.jpg",
                caption: "First chapter meeting - September 2022",
                date: "September 15, 2022"
            },
            {
                type: "image",
                url: "/timeline/orientation/team-building.jpg",
                caption: "Team building activities",
                date: "September 16, 2022"
            },
            {
                type: "image",
                url: "/timeline/orientation/group-photo.jpg",
                caption: "Inaugural team photo",
                date: "September 16, 2022"
            },
            {
                type: "video",
                url: "/timeline/orientation/highlights.mp4",
                thumbnail: "/timeline/orientation/highlights-thumb.jpg",
                caption: "Orientation highlights",
                date: "September 15-16, 2022"
            },
            {
                type: "image",
                url: "/timeline/orientation/welcome-banner.jpg",
                caption: "Welcome banner setup",
                date: "September 15, 2022"
            },
            {
                type: "image",
                url: "/timeline/orientation/registration.jpg",
                caption: "Registration desk",
                date: "September 15, 2022"
            }
        ]
    },
    {
        id: "chai-links",
        title: "Chai Links",
        subtitle: "Community Sessions",
        color: "secondary",
        subsections: [
            {
                id: "ch-0",
                title: "Ch 0",
                description: "The inaugural chai session where ideas brewed and connections formed.",
                date: "October 5, 2022",
                media: [
                    {
                        type: "image",
                        url: "/timeline/chai/ch0/gathering.jpg",
                        caption: "First Chai Links gathering",
                        date: "October 5, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch0/discussions.jpg",
                        caption: "Casual tech discussions",
                        date: "October 5, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch0/chai-setup.jpg",
                        caption: "Chai serving station",
                        date: "October 5, 2022"
                    },
                    {
                        type: "video",
                        url: "/timeline/chai/ch0/video.mp4",
                        thumbnail: "/timeline/chai/ch0/video-thumb.jpg",
                        caption: "Ch 0 highlights",
                        date: "October 5, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch0/networking.jpg",
                        caption: "Networking moments",
                        date: "October 5, 2022"
                    }
                ]
            },
            {
                id: "ch-1",
                title: "Ch 1",
                description: "Building on momentum with deeper technical discussions and networking.",
                date: "November 12, 2022",
                media: [
                    {
                        type: "image",
                        url: "/timeline/chai/ch1/session.jpg",
                        caption: "Ch 1 sessions",
                        date: "November 12, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch1/knowledge-sharing.jpg",
                        caption: "Knowledge sharing",
                        date: "November 12, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch1/presentation.jpg",
                        caption: "Tech talk presentation",
                        date: "November 12, 2022"
                    },
                    {
                        type: "image",
                        url: "/timeline/chai/ch1/group-discussion.jpg",
                        caption: "Group brainstorming",
                        date: "November 12, 2022"
                    }
                ]
            },
            {
                id: "more-chai",
                title: "More Coming Soon",
                description: "Stay tuned for upcoming Chai Links sessions!",
                media: []
            }
            // TO ADD MORE CHAI LINKS:
            // Copy the structure above and add a new object:
            // {
            //     id: "ch-2",
            //     title: "Ch 2",
            //     description: "Your description here",
            //     media: [
            //         {
            //             type: "image",
            //             url: "/timeline/chai/ch2/photo.jpg",
            //             caption: "Photo caption"
            //         }
            //     ]
            // }
        ]
    },
    {
        id: "founders",
        title: "Founders Unplugged",
        subtitle: "Stories & Insights",
        color: "accent",
        subsections: [
            {
                id: "zahid",
                title: "Zahid Akhtar",
                description: "Co-founder's journey from ideation to building a thriving tech community.",
                date: "December 23, 2025",
                speaker: {
                    name: "Zahid Akhtar",
                    title: "Life & Career Coach",
                    image: "/timeline/founders/zahid/ZahidAkhtar.png",
                    bio: "Zahid Akhtar is a seasoned Life & Career Coach, Behavioral Trainer, and Public Speaker dedicated to helping students and professionals gain clarity, confidence, and direction in their personal and professional journeys. With over two decades of experience across corporate, entrepreneurial, and training environments, Zahid has worked with engineering students, startup founders, corporate teams, and early-career professionals to strengthen communication, leadership presence, and emotional resilience."
                },
                media: [
                    {
                        type: "image",
                        url: "/timeline/founders/zahid/launch.jpg",
                        caption: "Zahid at chapter launch",
                        date: "December 23, 2025"
                    },
                    {
                        type: "video",
                        url: "/timeline/founders/zahid/interview.mp4",
                        thumbnail: "/timeline/founders/zahid/interview-thumb.jpg",
                        caption: "Founder's story interview",
                        date: "December 23, 2025"
                    },
                    {
                        type: "image",
                        url: "/timeline/founders/zahid/mentoring.jpg",
                        caption: "Mentoring new members",
                        date: "December 23, 2025"
                    },
                    {
                        type: "image",
                        url: "/timeline/founders/zahid/community.jpg",
                        caption: "Building the community",
                        date: "December 23, 2025"
                    }
                ]
            },
            {
                id: "more-founders",
                title: "More Stories Coming",
                description: "Additional founder stories will be added soon!",
                media: []
            }
            // TO ADD MORE FOUNDERS:
            // {
            //     id: "founder-name",
            //     title: "Founder Full Name",
            //     description: "Their story and contribution",
            //     media: [
            //         {
            //             type: "image",
            //             url: "/timeline/founders/name/photo.jpg",
            //             caption: "Caption"
            //         }
            //     ]
            // }
        ]
    }
]
