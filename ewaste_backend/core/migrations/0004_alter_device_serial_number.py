# Generated by Django 5.2.3 on 2025-06-23 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_pickuprequest_device_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='serial_number',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
