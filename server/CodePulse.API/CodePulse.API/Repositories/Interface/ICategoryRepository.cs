using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<IEnumerable<Category>> getAllAsync(
            string? query = null,
            string? sortBy = null,
            string? sortOrder = null,
            int? pageNumber = 1,
            int? pageSize = 100);
        Task<Category?> getById(Guid id);
        Task<Category?> updateAsync(Category category);

        Task<Category?> deleteAsync(Guid id);

        Task<int> getCount();
    }
}
