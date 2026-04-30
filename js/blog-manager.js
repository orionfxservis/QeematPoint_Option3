// ================= BLOG MANAGER =================

// Storage Key
const BLOG_KEY = "qeematBlogs";

// Get Blogs
function getBlogs() {
    return JSON.parse(localStorage.getItem(BLOG_KEY)) || [];
}

// Save Blogs
function saveBlogs(data) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(data));
}

// Auto Generate Slug
document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("blogTitleEn");

    if (titleInput) {
        titleInput.addEventListener("input", function () {
            const slug = this.value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/\s+/g, "-");

            const slugField = document.getElementById("blogSlug");
            if (slugField) slugField.value = slug;
        });
    }
});

// Handle Form Submit
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const blogs = getBlogs();

            const newBlog = {
                id: Date.now(),
                titleEn: document.getElementById("blogTitleEn").value,
                titleUr: document.getElementById("blogTitleUr").value,
                slug: document.getElementById("blogSlug").value,
                author: document.getElementById("blogAuthor").value,
                category: document.getElementById("blogCategoryDropdown").value,
                categoryUr: document.getElementById("blogCategoryUr").value,
                image: document.getElementById("blogImage").value,
                status: document.getElementById("blogStatus").value,
                descEn: document.getElementById("blogDescEn").value,
                descUr: document.getElementById("blogDescUr").value,
                contentEn: document.getElementById("blogContentEn").value,
                contentUr: document.getElementById("blogContentUr").value,
                views: 0,
                date: new Date().toLocaleDateString()
            };

            blogs.unshift(newBlog);
            saveBlogs(blogs);

            alert("✅ Blog Saved Successfully!");

            form.reset();
            renderBlogs();
        });
    }
});

// Render Blogs
function renderBlogs() {
    const blogs = getBlogs();
    const list = document.getElementById("blogList");

    if (!list) return;

    list.innerHTML = "";

    if (blogs.length === 0) {
        list.innerHTML = `<p style="color:#aaa;">No blogs found</p>`;
        return;
    }

    blogs.forEach(blog => {
        list.innerHTML += `
        <div class="grid-table-row">
            <div><input type="checkbox"></div>
            <div><img src="${blog.image}" width="50"></div>
            <div>${blog.titleEn}</div>
            <div>${blog.category}</div>
            <div>${blog.status}</div>
            <div>${blog.views}</div>
            <div>${blog.date}</div>
            <div>
                <button onclick="deleteBlog(${blog.id})" style="color:red;">Delete</button>
            </div>
        </div>
        `;
    });
}

// Delete Blog
function deleteBlog(id) {
    let blogs = getBlogs();
    blogs = blogs.filter(blog => blog.id !== id);
    saveBlogs(blogs);
    renderBlogs();
}

// Load Blogs on Page Load
document.addEventListener("DOMContentLoaded", renderBlogs);