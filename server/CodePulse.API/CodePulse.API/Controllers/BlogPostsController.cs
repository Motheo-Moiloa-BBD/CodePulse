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

        public BlogPostsController(IMapper mapper, IBlogPostRepository blogPostRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.mapper = mapper;            
        }
        
        //https://localhost:xxxx/api/blogposts
        [HttpPost]
        public async Task<IActionResult> createBlogPost(CreateBlogPostRequestDTO request)
        {
            //map dto to domain 
            var blogPost = mapper.Map<CreateBlogPostRequestDTO, BlogPost>(request);

            blogPost = await blogPostRepository.createAsync(blogPost);

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
