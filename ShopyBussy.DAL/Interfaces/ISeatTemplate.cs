using ShopyBussy.DAL.Entity;

namespace ShopyBussy.DAL.Interfaces
{
    public interface ISeatTemplate
    {
        Guid CompanyId { get; set; }
        Guid Id { get; set; }
        List<List<LayoutCell>> LayoutData { get; set; }
        string Name { get; set; }
    }
}