using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;

        public AuthController(UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
        }

        //https://localhost:xxxx/api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            //check email
            var identityUser = await userManager.FindByEmailAsync(request.Email);

            if(identityUser is not null)
            {
                //check password
               var isPasswordMatch = await userManager.CheckPasswordAsync(identityUser, request.Password);

                if(isPasswordMatch)
                {
                    var userRoles = await userManager.GetRolesAsync(identityUser);
                    //create token and response
                    var response = new LoginResponseDTO()
                    {
                        Email = request.Email,
                        Roles = userRoles.ToList(),
                        Token = "Token"
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect.");

            return ValidationProblem(ModelState);
        }

        //https://localhost:xxxx/api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            //Create IdentityUser object (domain model)
            var user = new IdentityUser
            {
                UserName = request.Email.Trim(),
                Email = request.Email,
            };

            //Catus
            //reate user
            var identityResult = await userManager.CreateAsync(user, request.Password);
            
            if(identityResult.Succeeded)
            {
                //Add Role to user (Reader)
                identityResult = await userManager.AddToRoleAsync(user, "Reader");

                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }
    }
}
