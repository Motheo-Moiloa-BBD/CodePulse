using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDBContext dbContext;
        public CategoryRepository(ApplicationDBContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        
        public async Task<IEnumerable<Category>> getAllAsync(string? query = null)
        {
            //Query the DB
            var categories = dbContext.Categories.AsQueryable();

            //Filtering
            if(string.IsNullOrWhiteSpace(query) == false)
            {
                categories = categories.Where(x => x.Name.Contains(query));
            }

            //Sorting

            //Pagination

            return await categories.ToListAsync();
        }

        public async Task<Category?> getById(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Category?> updateAsync(Category category)
        {
            var exisitingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);

            if(exisitingCategory != null) 
            {
                dbContext.Entry(exisitingCategory).CurrentValues.SetValues(category);
                await dbContext.SaveChangesAsync();

                return category;
            }
            return null;
        }

        public async Task<Category?> deleteAsync(Guid id)
        {
            var exisitingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            
            if(exisitingCategory is null)
            {
                return null;
            }

            dbContext.Categories.Remove(exisitingCategory);
            await dbContext.SaveChangesAsync();
            return exisitingCategory;
        }

    }
}
