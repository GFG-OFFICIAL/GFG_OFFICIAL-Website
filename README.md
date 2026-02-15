# 🚀 GFG Student Chapter PWA
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
A modern, high-performance Progressive Web Application (PWA) designed for **GeeksforGeeks Student Chapters**. This platform streamlines event management, student engagement, and daily coding practice through an immersive and responsive interface.
---
## ✨ Key Features
-   **🎯 Problem of the Day (POTD)**: Integrated daily coding challenges to keep students engaged and sharp.
-   **📅 Event Management**: Complete lifecycle for events—from registration and live tracking to past event archives.
-   **🛡️ Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for:
    *   **Leads**: Manage events, broadcasts, and member activities.
    *   **Members**: Track attendance, access internal resources, and view stats.
    *   **Public**: View general announcements and upcoming events.
-   **🏗️ Innovation Forge**: A dedicated space to showcase and manage student projects and technical innovations.
-   **📈 Attendance Tracking**: Automated attendance logging and reporting for chapter activities.
-   **📱 PWA Ready**: Installable on any device for a native-like experience with offline capabilities.
-   **🎭 Immersive UI**: Built with Framer Motion and Radix UI for smooth transitions and accessible components.
---
## 🛠️ Tech Stack
### Frontend
-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/)
-   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
### Backend & Infrastructure
-   **Database**: [PostgreSQL (via Supabase)](https://supabase.com/)
-   **Authentication**: [Supabase Auth](https://supabase.com/auth)
-   **Storage**: [Supabase Storage](https://supabase.com/storage)
-   **Deployment**: Optimized for [Vercel](https://vercel.com/)
---
## 📁 Repository Structure
```text
.
├── frontend/          # Next.js application (UI, components, logic)
└── README.md          # Project documentation
```
---
## 🚀 Getting Started
### Prerequisites
-   Node.js 20+
-   npm / yarn / pnpm
-   Supabase Account
### Installation
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/GFG-OFFICIAL/GFG_OFFICIAL.git
    cd GFG_OFFICIAL
    ```
2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```
3.  **Environment Variables**
    Create a `.env.local` file in the `frontend` directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the app.
---
## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
---
## 📄 License
Distributed under the MIT License. See `LICENSE` for more information (if applicable).
---
**Built with ❤️ by the GFG Student Chapter Team.**
