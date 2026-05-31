namespace ShopyBussy.DAL.Entity
{
    public interface ITripStop
    {
        City City { get; set; }
        Guid Id { get; set; }
        int NumberId { get; set; }
        decimal Price { get; set; }
        string StationName { get; set; }
        DateTime Time { get; set; }
        Guid TripId { get; set; }
    }
}