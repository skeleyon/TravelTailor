# Generated by Django 4.2 on 2023-04-23 01:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Attraction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(default="default", max_length=64)),
                ("city", models.CharField(default="default", max_length=64)),
                (
                    "image",
                    models.ImageField(
                        default="default", upload_to="attraction_images/"
                    ),
                ),
                ("description", models.CharField(default="default", max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name="Reservation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        default="",
                        max_length=255,
                        unique=True,
                        verbose_name="login.User",
                    ),
                ),
                (
                    "attraction",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="attractions.attraction",
                    ),
                ),
            ],
        ),
    ]