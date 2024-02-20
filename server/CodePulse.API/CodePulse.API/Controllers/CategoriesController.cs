using AutoMapper;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    //https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        //Injecting repository using a constructor
        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        //https://localhost:xxxx/api/categories
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO request)
        {
            //Map DTO to Domain Model
            var category = mapper.Map<CreateCategoryRequestDTO, Category>(request);

            var savedCategory = await categoryRepository.CreateAsync(category);
            
            //Map Domain Model to DTO
            var response = mapper.Map<Category, CategoryDTO>(savedCategory);

            return Ok(response);
        }

        //https://localhost:xxxx/api/categories
        [HttpGet]
        public async Task<IActionResult> getAllCategories()
        {
           var categories = await categoryRepository.getAllAsync();

            //Map Domain model to DTO
            var response = mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(categories);

            return Ok(response);
        }
    }
}
