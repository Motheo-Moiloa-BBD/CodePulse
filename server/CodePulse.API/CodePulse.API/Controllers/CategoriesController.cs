using AutoMapper;
using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO request)
        {
            //Map DTO to Domain Model
            var category = mapper.Map<CreateCategoryRequestDTO, Category>(request);

            var savedCategory = await categoryRepository.CreateAsync(category);

            //Map Domain Model to DTO
            var response = mapper.Map<Category, CategoryDTO>(savedCategory);

            return CreatedAtAction("CreateCategory",response);
        }

        //https://localhost:xxxx/api/categories?query=keyword
        [HttpGet]
        public async Task<IActionResult> GetAllCategories([FromQuery] string? query)
        {
            var categories = await categoryRepository.getAllAsync(query);

            //Map Domain model to DTO
            var response = mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(categories);

            return Ok(response);
        }

        //https://localhost:xxxx/api/categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var exisitingCategory = await categoryRepository.getById(id);

            if (exisitingCategory == null)
            {
                return NotFound("Category with id " + id + " not found.");
            }

            //Map from domain model to dto
            var response = mapper.Map<Category, CategoryDTO>(exisitingCategory);

            return Ok(response);
        }

        //https://localhost:xxxx/api/categories/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateCategoryById([FromRoute] Guid id, UpdateCategoryRequestDTO request)
        {
            var category = new Category(){
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

            category = await categoryRepository.updateAsync(category);

            if(category == null)
            {
                return NotFound("Category with id " + id + " not found.");
            }

            var response = mapper.Map<Category, CategoryDTO>(category);

            return Ok(response);
        }

        //https://localhost:xxxx/api/categories/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var category = await categoryRepository.deleteAsync(id);

            if(category == null)
            {
                return NotFound("Category with id " + id + " not found.");
            }

            //convert domain model to dto
            var response = mapper.Map<Category, CategoryDTO>(category);
            return Ok(response);
        }

    }
}
