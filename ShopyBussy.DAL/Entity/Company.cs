using ShopyBussy.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Entity
{
    public class Company : ICompany
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string LofoPath { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string? Phone { get; set; }
        public required string PayAdress { get; set; }
    }
}
