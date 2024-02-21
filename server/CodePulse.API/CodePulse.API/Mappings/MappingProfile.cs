using AutoMapper;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;

namespace CodePulse.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Category mappings
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CreateCategoryRequestDTO, Category>();
            CreateMap<UpdateCategoryRequestDTO, Category>();

            //BlogPost mappings
            CreateMap<BlogPost, BlogPostDTO>().ReverseMap();
            CreateMap<CreateBlogPostRequestDTO, BlogPost>();

        }
    }
}
