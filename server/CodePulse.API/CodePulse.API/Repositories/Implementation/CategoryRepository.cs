﻿using CodePulse.API.Data;
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

        public async Task<IEnumerable<Category>> getAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
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
    }
}
