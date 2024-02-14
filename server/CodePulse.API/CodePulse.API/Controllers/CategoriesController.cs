using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    //https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDBContext dbContext;

        //Injecting dbcontext using a constructor
        public CategoriesController(ApplicationDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO request)
        {
            //Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };
            
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            //Map Domain Model to DTO
            var response = new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = request.UrlHandle
            };

            return Ok(response);
        }
    }
}
