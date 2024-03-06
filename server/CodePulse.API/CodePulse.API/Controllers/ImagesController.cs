using AutoMapper;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;
        private readonly IMapper mapper;

        public ImagesController(IImageRepository imageRepository, IMapper mapper)
        {
            this.imageRepository = imageRepository;
            this.mapper = mapper;
        }
        
        //POST: https://localhost:xxxx/api/images
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);

            if (ModelState.IsValid)
            {
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    FileName = fileName,
                    Title = title,
                    DateCreated = DateTime.Now,
                };

                blogImage = await imageRepository.upload(file, blogImage);

                //convert domain model to dto
                var response = mapper.Map<BlogImage, BlogImageDTO>(blogImage);
                return Ok(response);
            }
            return BadRequest(ModelState);
        }

        //GET: https://localhost:xxxx/api/images
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await imageRepository.getAll();

            //convert domain model to dto
            var response = mapper.Map<IEnumerable<BlogImage>, IEnumerable<BlogImageDTO>>(images);

            return Ok(response);
        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };
            
            if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }

            if(file.Length > 10485768)
            {
                ModelState.AddModelError("file", "File size cannot exceed 10MB");
            }
        }

    }
}
