# Generated by Django 5.2.3 on 2025-06-23 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_device_serial_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='location',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
