using ShopyBussy.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Entity
{
    public class City : ICity
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
    }
}
