using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
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
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
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

                    //Create token and response
                    var jwtToken = tokenRepository.createJwtToken(identityUser, userRoles.ToList());

                    var response = new LoginResponseDTO()
                    {
                        Email = request.Email,
                        Roles = userRoles.ToList(),
                        Token = jwtToken
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
