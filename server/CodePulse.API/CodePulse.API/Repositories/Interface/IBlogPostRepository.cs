using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> createAsync(BlogPost blogpost);
        Task<IEnumerable<BlogPost>> getAllAsync();
        Task<BlogPost> getByIdAsync(Guid id);

        Task<BlogPost> getByUrlHandleAsync(string urlHandle);

        Task<BlogPost?> updateAysnc(BlogPost blogPost);

        Task<BlogPost?> deleteAsync(Guid id);
    }
}
