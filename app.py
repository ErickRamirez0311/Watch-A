from faker import Faker
from faker.providers import bank

fake=Faker()
fake.add_provider(bank)

for n in range(5):
    #print(fake.name())
    #print(fake.address())
    #print(fake.text())
    #print(fake.bban())
    print(fake.first_name())