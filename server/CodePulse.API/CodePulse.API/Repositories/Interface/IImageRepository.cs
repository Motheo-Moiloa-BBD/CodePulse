using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<BlogImage> upload(IFormFile file, BlogImage image);

        Task<IEnumerable<BlogImage>> getAll();
    }
}
