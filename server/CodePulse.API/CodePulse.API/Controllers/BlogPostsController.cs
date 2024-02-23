using AutoMapper;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IBlogPostRepository blogPostRepository;
        private readonly ICategoryRepository categoryRepository;

        public BlogPostsController(IMapper mapper, IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;            
        }
        
        //https://localhost:xxxx/api/blogposts
        [HttpPost]
        public async Task<IActionResult> createBlogPost(CreateBlogPostRequestDTO request)
        {
            //map dto to domain
            var blogPost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = new List<Category>()
            };

            foreach(var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.getById(categoryGuid);

                if(existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            blogPost = await blogPostRepository.createAsync(blogPost);

            //TODO: Modify this conversion as well
            //map domain to dto
            var response = mapper.Map<BlogPost, BlogPostDTO>(blogPost);

            return Ok(response);
        }

        //https://localhost:xxxx/api/blogposts
        [HttpGet]
        public async Task<IActionResult> getAllBlogPosts()
        {
            var blogPosts = await blogPostRepository.getAllAsync();

            //convert domain model to dto
            var response = mapper.Map<IEnumerable<BlogPost>, IEnumerable<BlogPostDTO>>(blogPosts);

            return Ok(response);
        }
    }
}
