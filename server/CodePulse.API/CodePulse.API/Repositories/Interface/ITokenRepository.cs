using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Repositories.Interface
{
    public interface ITokenRepository
    {
        string createJwtToken(IdentityUser user, List<string> roles);
    }
}
