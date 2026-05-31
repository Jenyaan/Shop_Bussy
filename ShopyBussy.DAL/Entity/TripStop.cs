using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Entity
{
    public class TripStop : ITripStop
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public City City { get; set; }
        public int NumberId { get; set; }
        public string StationName { get; set; }
        public DateTime Time { get; set; }
        public decimal Price { get; set; }
    }
}
