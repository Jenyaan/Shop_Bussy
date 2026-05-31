namespace ShopyBussy.DAL.Entity
{
    public interface IUser
    {
        string Email { get; set; }
        string FirstName { get; set; }
        Guid Id { get; set; }
        string LastName { get; set; }
        string PasswordHash { get; set; }
        string? Phone { get; set; }
        RoleType Role { get; set; }
    }
}