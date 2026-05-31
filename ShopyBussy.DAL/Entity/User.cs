
namespace ShopyBussy.DAL.Entity
{
    public enum RoleType
    {
        Сlient,
        Admin
    }

    public class User : IUser
    {
        public Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string? Phone { get; set; }
        public required RoleType Role { get; set; }

    }
}
