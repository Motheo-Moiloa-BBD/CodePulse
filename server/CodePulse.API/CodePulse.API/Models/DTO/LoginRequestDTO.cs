﻿namespace CodePulse.API.Models.DTO
{
    public class LoginRequestDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
