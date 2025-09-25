// Social media links configuration
const socialLinks = {
    linkedin: {
        url: "https://www.linkedin.com/company/neuronauts-ai-team/",
        title: "LinkedIn"
    },
    instagram: {
        url: "https://www.instagram.com/neuronauts.ai",
        title: "Instagram"
    },
    youtube: {
        url: "https://www.youtube.com/@neuronautsai",
        title: "YouTube"
    }
};

// Function to generate social media links HTML
function generateSocialLinks() {
    return `
        <!-- LinkedIn -->
        <a href="${socialLinks.linkedin.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.791-1.75-1.764s.784-1.764 1.75-1.764 1.75.791 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.064-1.867-3.064-1.867 0-2.154 1.459-2.154 2.968v5.7h-3v-10h2.881v1.367h.041c.401-.758 1.379-1.555 2.841-1.555 3.038 0 3.601 2.001 3.601 4.604v5.584z" />
            </svg>
        </a>

        <a href="${socialLinks.instagram.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.917 2h8.166C19.148 2 22 4.852 22 8.083v8.166C22 19.148 19.148 22 15.917 22H7.917C4.852 22 2 19.148 2 15.917V7.917C2 4.852 4.852 2 7.917 2zm0 2C6.12 4 4 6.12 4 7.917v8.166C4 17.88 6.12 20 7.917 20h8.166C17.88 20 20 17.88 20 16.083V7.917C20 6.12 17.88 4 16.083 4H7.917zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zM18 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
        </a>

        <!-- YouTube -->
        <a href="${socialLinks.youtube.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors duration-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a2.994 2.994 0 00-2.112-2.117C19.75 3.5 12 3.5 12 3.5s-7.75 0-9.386.569a2.994 2.994 0 00-2.112 2.117A31.86 31.86 0 000 12a31.86 31.86 0 00.502 5.814 2.994 2.994 0 002.112 2.117C4.25 20.5 12 20.5 12 20.5s7.75 0 9.386-.569a2.994 2.994 0 002.112-2.117A31.86 31.86 0 0024 12a31.86 31.86 0 00-.502-5.814zM9.545 15.568V8.432L16.818 12l-7.273 3.568z" />
            </svg>
        </a>
    `;
}

// Function to initialize social media links
function initSocialLinks() {
    const socialContainers = document.querySelectorAll('.social-links-container');
    socialContainers.forEach(container => {
        container.innerHTML = generateSocialLinks();
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialLinks);
} else {
    initSocialLinks();
}