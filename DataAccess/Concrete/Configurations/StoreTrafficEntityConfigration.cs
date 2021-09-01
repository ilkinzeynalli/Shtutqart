using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Concrete.Configurations
{
    public class StoreTrafficEntityConfigration : IEntityTypeConfiguration<StoreTraffic>
    {
        public void Configure(EntityTypeBuilder<StoreTraffic> builder)
        {
            builder.HasKey(x => new { x.Id });
        }
    }
}
