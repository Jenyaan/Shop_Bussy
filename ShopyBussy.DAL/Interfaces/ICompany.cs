namespace ShopyBussy.DAL.Interfaces
{
    public interface ICompany
    {
        string Description { get; set; }
        string Email { get; set; }
        Guid Id { get; set; }
        string LofoPath { get; set; }
        string Name { get; set; }
        string PayAdress { get; set; }
        string? Phone { get; set; }
    }
}