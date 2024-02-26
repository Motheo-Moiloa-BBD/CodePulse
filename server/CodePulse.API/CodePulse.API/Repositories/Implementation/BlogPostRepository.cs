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
           return await dbContext.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> getByIdAsync(Guid id)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BlogPost?> updateAysnc(BlogPost blogPost)
        {
            var exisitingBlogPost = await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == blogPost.Id);

            if(exisitingBlogPost == null) {
                return null;
            }

            //Update blogpost
            dbContext.Entry(exisitingBlogPost).CurrentValues.SetValues(blogPost);

            //Update categories
            exisitingBlogPost.Categories = blogPost.Categories;

            await dbContext.SaveChangesAsync();

            return blogPost;
        }

        public async Task<BlogPost?> deleteAsync(Guid id)
        {
            var exisitingBlogPost = await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);

            if (exisitingBlogPost is null)
            {
                return null;
            }

            dbContext.BlogPosts.Remove(exisitingBlogPost);
            await dbContext.SaveChangesAsync();
            return exisitingBlogPost;
        }

    }
}
