# Generated by Django 4.1.7 on 2023-04-16 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0003_hotel_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='image',
            field=models.URLField(),
        ),
    ]
