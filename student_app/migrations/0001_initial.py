# Generated by Django 5.0.6 on 2024-06-19 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=266)),
                ('address', models.CharField(max_length=268)),
                ('fee', models.IntegerField()),
            ],
        ),
    ]
