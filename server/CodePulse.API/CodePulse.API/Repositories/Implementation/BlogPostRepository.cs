using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDBContext dbContext;

        public BlogPostRepository(ApplicationDBContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<BlogPost> createAsync(BlogPost blogpost)
        {
            await dbContext.BlogPosts.AddAsync(blogpost);
            await dbContext.SaveChangesAsync();

            return blogpost;
        }

        public async Task<IEnumerable<BlogPost>> getAllAsync()
        {
           return await dbContext.BlogPosts.ToListAsync();
        }
    }
}
