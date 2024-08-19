// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// Button to send email
function sendMail() {
   window.location = "mailto:yuvichh01@gmail.com";
}

// Blog functionality
const blogs = [
  { id: 1, title: "Running a Full Bitcoin Node", file: "/blogs/bitcoin-node.md" },
  { id: 2, title: "Exploring DevOps", file: "/blogs/blog2.md" },
  //add more here
];

function populateBlogList() {
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = ''; // Clear existing content
  blogs.forEach(blog => {
    const blogItem = document.createElement('div');
    blogItem.innerHTML = `<h3><a href="#" onclick="loadBlog(${blog.id})">${blog.title}</a></h3>`;
    blogList.appendChild(blogItem);
  });
}

function loadBlog(id) {
  const blog = blogs.find(b => b.id === id);
  if (blog) {
    fetch(`blogs/${blog.file}`)
      .then(response => response.text())
      .then(markdown => {
        document.getElementById('blog-title').innerHTML = `<h2>${blog.title}</h2>`;
        document.getElementById('blog-body').innerHTML = marked(markdown);
        document.getElementById('blogs').style.display = 'none';
        document.getElementById('blog-content').style.display = 'block';
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        alert('Failed to load blog post. Please try again later.');
      });
  }
}

function backToBlogList() {
  document.getElementById('blogs').style.display = 'block';
  document.getElementById('blog-content').style.display = 'none';
}

// Initialize blog list when the page loads
window.addEventListener('load', populateBlogList);