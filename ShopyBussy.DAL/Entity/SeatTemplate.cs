using ShopyBussy.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ShopyBussy.DAL.Entity
{
    public enum CellType
    {
        Empty = 0,
        Seat = 1,
        Door = 2,
        Wc = 3
    }

    public class LayoutCell
    {
        [JsonPropertyName("type")]
        public CellType Type { get; set; } = CellType.Empty;
    }

    public class SeatTemplate : ISeatTemplate
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<List<LayoutCell>> LayoutData { get; set; } = new();
    }
}