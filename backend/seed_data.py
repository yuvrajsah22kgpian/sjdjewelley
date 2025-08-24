import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
import models
import crud
import schemas
from auth import get_password_hash

def seed_database():
    db = SessionLocal()
    
    try:
        # Create admin user if not exists
        admin_user = crud.get_user_by_email(db, "admin@sjewelry.com")
        if not admin_user:
            admin_user_data = schemas.UserCreate(
                email="admin@sjewelry.com",
                name="Admin",
                password="admin123"
            )
            admin_user = crud.create_user(db=db, user=admin_user_data)
            admin_user.is_admin = True
            db.commit()
            print("Admin user created")

        # Complete sample products data from frontend
        sample_products = [
            {
                "name": "Classic Diamond Solitaire Ring",
                "description": "A timeless classic featuring a brilliant-cut diamond set in 18k white gold. Perfect for engagement or special occasions.",
                "original_price": 2500.0,
                "sale_price": 2000.0,
                "discount": 20.0,
                "category": "rings",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "engagement",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "1.5 carats",
                    "Diamond Cut": "Round Brilliant",
                    "Diamond Color": "F",
                    "Diamond Clarity": "VS1",
                    "Metal": "18k White Gold",
                    "Ring Size": "6.5"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
                        "alt": "Diamond Solitaire Ring",
                        "is_primary": True
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=face",
                        "alt": "Diamond Solitaire Ring Side View",
                        "is_primary": False
                    }
                ]
            },
            {
                "name": "Pearl Drop Earrings",
                "description": "Elegant freshwater pearl drop earrings with sterling silver findings. Perfect for formal occasions.",
                "original_price": 850.0,
                "sale_price": 680.0,
                "discount": 20.0,
                "category": "earrings",
                "material": "pearl",
                "gemstone": "pearl",
                "occasion": "formal",
                "in_stock": True,
                "new_arrivals": False,
                "certified": False,
                "customizable": False,
                "specifications": {
                    "Pearl Type": "Freshwater",
                    "Pearl Size": "8mm",
                    "Metal": "Sterling Silver",
                    "Clasp Type": "Leverback"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
                        "alt": "Pearl Drop Earrings",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Gold Tennis Bracelet",
                "description": "Classic tennis bracelet featuring round diamonds set in 14k yellow gold. A versatile piece for any occasion.",
                "original_price": 1200.0,
                "sale_price": 960.0,
                "discount": 20.0,
                "category": "bangles_bracelets",
                "material": "gold",
                "gemstone": "diamond",
                "occasion": "casual",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "2.0 carats total",
                    "Diamond Cut": "Round Brilliant",
                    "Metal": "14k Yellow Gold",
                    "Length": "7.5 inches",
                    "Clasp": "Lobster"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
                        "alt": "Gold Tennis Bracelet",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Emerald Cut Diamond Necklace",
                "description": "Stunning emerald-cut diamond pendant on a delicate chain. The geometric cut showcases the diamond's clarity and brilliance.",
                "original_price": 3200.0,
                "sale_price": 2560.0,
                "discount": 20.0,
                "category": "necklaces",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "formal",
                "in_stock": True,
                "new_arrivals": True,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "2.5 carats",
                    "Diamond Cut": "Emerald",
                    "Diamond Color": "G",
                    "Diamond Clarity": "VS2",
                    "Metal": "18k White Gold",
                    "Chain Length": "18 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
                        "alt": "Emerald Cut Diamond Necklace",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Vintage Ruby Ring",
                "description": "Vintage-inspired ruby ring with intricate filigree work. Features a deep red ruby surrounded by accent diamonds.",
                "original_price": 1800.0,
                "sale_price": 1440.0,
                "discount": 20.0,
                "category": "rings",
                "material": "ruby",
                "gemstone": "ruby",
                "occasion": "vintage",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": False,
                "specifications": {
                    "Ruby Weight": "1.8 carats",
                    "Ruby Origin": "Burma",
                    "Accent Diamonds": "0.5 carats total",
                    "Metal": "18k Yellow Gold",
                    "Ring Size": "7"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
                        "alt": "Vintage Ruby Ring",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Sapphire Stud Earrings",
                "description": "Classic sapphire stud earrings in 14k white gold. The deep blue sapphires are perfect for everyday wear.",
                "original_price": 950.0,
                "sale_price": 760.0,
                "discount": 20.0,
                "category": "earrings",
                "material": "sapphire",
                "gemstone": "sapphire",
                "occasion": "casual",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Sapphire Weight": "1.2 carats total",
                    "Sapphire Color": "Royal Blue",
                    "Metal": "14k White Gold",
                    "Back Type": "Push Back"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=face",
                        "alt": "Sapphire Stud Earrings",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Diamond Eternity Band",
                "description": "Elegant eternity band with diamonds set all around. Perfect as a wedding band or anniversary gift.",
                "original_price": 2200.0,
                "sale_price": 1760.0,
                "discount": 20.0,
                "category": "rings",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "wedding",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "1.8 carats total",
                    "Diamond Cut": "Round Brilliant",
                    "Metal": "18k White Gold",
                    "Ring Size": "6.5",
                    "Setting": "Channel"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=top",
                        "alt": "Diamond Eternity Band",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "White Gold Chain Necklace",
                "description": "Simple and elegant white gold chain necklace. Perfect for layering or wearing alone.",
                "original_price": 650.0,
                "sale_price": 520.0,
                "discount": 20.0,
                "category": "necklaces",
                "material": "gold",
                "gemstone": "none",
                "occasion": "casual",
                "in_stock": True,
                "new_arrivals": False,
                "certified": False,
                "customizable": True,
                "specifications": {
                    "Metal": "14k White Gold",
                    "Length": "18 inches",
                    "Width": "2mm",
                    "Clasp": "Lobster"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
                        "alt": "White Gold Chain Necklace",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Tanzanite Cocktail Ring",
                "description": "Stunning tanzanite cocktail ring with a large oval-cut stone. The rare blue-violet color is mesmerizing.",
                "original_price": 2800.0,
                "sale_price": 2240.0,
                "discount": 20.0,
                "category": "rings",
                "material": "tanzanite",
                "gemstone": "tanzanite",
                "occasion": "cocktail",
                "in_stock": True,
                "new_arrivals": True,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Tanzanite Weight": "3.2 carats",
                    "Tanzanite Cut": "Oval",
                    "Metal": "18k White Gold",
                    "Ring Size": "7",
                    "Setting": "Prong"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=face",
                        "alt": "Tanzanite Cocktail Ring",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Diamond Halo Pendant",
                "description": "Beautiful diamond halo pendant featuring a center stone surrounded by smaller diamonds. Comes with a matching chain.",
                "original_price": 1500.0,
                "sale_price": 1200.0,
                "discount": 20.0,
                "category": "pendants",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "gift",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Center Diamond": "0.5 carats",
                    "Halo Diamonds": "0.3 carats total",
                    "Metal": "14k White Gold",
                    "Chain Length": "18 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top",
                        "alt": "Diamond Halo Pendant",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Rose Gold Bangle",
                "description": "Elegant rose gold bangle with a modern design. Perfect for stacking or wearing alone.",
                "original_price": 750.0,
                "sale_price": 600.0,
                "discount": 20.0,
                "category": "bangles_bracelets",
                "material": "gold",
                "gemstone": "none",
                "occasion": "casual",
                "in_stock": True,
                "new_arrivals": False,
                "certified": False,
                "customizable": True,
                "specifications": {
                    "Metal": "14k Rose Gold",
                    "Width": "4mm",
                    "Diameter": "2.5 inches",
                    "Finish": "Polished"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&crop=center",
                        "alt": "Rose Gold Bangle",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Aquamarine Drop Earrings",
                "description": "Delicate aquamarine drop earrings with a soft blue color reminiscent of the ocean. Perfect for spring and summer.",
                "original_price": 1100.0,
                "sale_price": 880.0,
                "discount": 20.0,
                "category": "earrings",
                "material": "aquamarine",
                "gemstone": "aquamarine",
                "occasion": "spring",
                "in_stock": True,
                "new_arrivals": True,
                "certified": True,
                "customizable": False,
                "specifications": {
                    "Aquamarine Weight": "1.5 carats total",
                    "Aquamarine Cut": "Pear",
                    "Metal": "14k White Gold",
                    "Length": "1.5 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=bottom",
                        "alt": "Aquamarine Drop Earrings",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Princess Cut Diamond Ring",
                "description": "Modern princess-cut diamond ring with a square shape and brilliant sparkle. Set in platinum for durability.",
                "original_price": 3500.0,
                "sale_price": 2800.0,
                "discount": 20.0,
                "category": "rings",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "engagement",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "2.0 carats",
                    "Diamond Cut": "Princess",
                    "Diamond Color": "E",
                    "Diamond Clarity": "VS1",
                    "Metal": "Platinum",
                    "Ring Size": "6.5"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=face",
                        "alt": "Princess Cut Diamond Ring",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Platinum Wedding Band",
                "description": "Classic platinum wedding band with a comfort fit. The perfect complement to any engagement ring.",
                "original_price": 900.0,
                "sale_price": 720.0,
                "discount": 20.0,
                "category": "rings",
                "material": "platinum",
                "gemstone": "none",
                "occasion": "wedding",
                "in_stock": True,
                "new_arrivals": False,
                "certified": False,
                "customizable": True,
                "specifications": {
                    "Metal": "Platinum",
                    "Width": "3mm",
                    "Ring Size": "7",
                    "Finish": "Polished"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=side",
                        "alt": "Platinum Wedding Band",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Garnet Statement Necklace",
                "description": "Bold garnet statement necklace with multiple stones in a vintage-inspired design. Perfect for holiday parties.",
                "original_price": 1300.0,
                "sale_price": 1040.0,
                "discount": 20.0,
                "category": "necklaces",
                "material": "garnet",
                "gemstone": "garnet",
                "occasion": "holiday",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": False,
                "specifications": {
                    "Garnet Weight": "8.5 carats total",
                    "Garnet Cut": "Mixed",
                    "Metal": "18k Yellow Gold",
                    "Length": "20 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
                        "alt": "Garnet Statement Necklace",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Diamond Tennis Necklace",
                "description": "Luxurious diamond tennis necklace with uniform stones set in white gold. A true statement piece.",
                "original_price": 4200.0,
                "sale_price": 3360.0,
                "discount": 20.0,
                "category": "necklaces",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "luxury",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": True,
                "specifications": {
                    "Diamond Weight": "5.0 carats total",
                    "Diamond Cut": "Round Brilliant",
                    "Metal": "18k White Gold",
                    "Length": "18 inches",
                    "Clasp": "Lobster"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=top",
                        "alt": "Diamond Tennis Necklace",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Citrine Chandelier Earrings",
                "description": "Dramatic citrine chandelier earrings with multiple drops. The warm yellow color adds a sunny disposition.",
                "original_price": 850.0,
                "sale_price": 680.0,
                "discount": 20.0,
                "category": "earrings",
                "material": "citrine",
                "gemstone": "citrine",
                "occasion": "evening",
                "in_stock": True,
                "new_arrivals": False,
                "certified": False,
                "customizable": True,
                "specifications": {
                    "Citrine Weight": "3.2 carats total",
                    "Citrine Cut": "Mixed",
                    "Metal": "14k Yellow Gold",
                    "Length": "2.5 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=bottom",
                        "alt": "Citrine Chandelier Earrings",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Art Deco Diamond Brooch",
                "description": "Exquisite Art Deco diamond brooch with geometric patterns and filigree work. A true collector's piece.",
                "original_price": 2600.0,
                "sale_price": 2080.0,
                "discount": 20.0,
                "category": "accessories",
                "material": "natural_diamond",
                "gemstone": "diamond",
                "occasion": "vintage",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": False,
                "specifications": {
                    "Diamond Weight": "2.8 carats total",
                    "Diamond Cut": "Mixed",
                    "Metal": "18k White Gold",
                    "Size": "2.5 x 1.5 inches",
                    "Clasp": "Safety"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&crop=center",
                        "alt": "Art Deco Diamond Brooch",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Moonstone Stackable Rings",
                "description": "Set of three moonstone stackable rings with an ethereal blue sheen. Perfect for the bohemian spirit.",
                "original_price": 600.0,
                "sale_price": 480.0,
                "discount": 20.0,
                "category": "rings",
                "material": "moonstone",
                "gemstone": "moonstone",
                "occasion": "bohemian",
                "in_stock": True,
                "new_arrivals": True,
                "certified": False,
                "customizable": True,
                "specifications": {
                    "Moonstone Weight": "1.5 carats total",
                    "Metal": "Sterling Silver",
                    "Ring Sizes": "6, 7, 8",
                    "Finish": "Oxidized"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=stack",
                        "alt": "Moonstone Stackable Rings",
                        "is_primary": True
                    }
                ]
            },
            {
                "name": "Opal Pendant Necklace",
                "description": "Unique opal pendant with a play of color that changes with the light. Each opal is one of a kind.",
                "original_price": 1050.0,
                "sale_price": 840.0,
                "discount": 20.0,
                "category": "pendants",
                "material": "opal",
                "gemstone": "opal",
                "occasion": "unique",
                "in_stock": True,
                "new_arrivals": False,
                "certified": True,
                "customizable": False,
                "specifications": {
                    "Opal Weight": "2.1 carats",
                    "Opal Type": "Australian",
                    "Metal": "14k Yellow Gold",
                    "Chain Length": "18 inches"
                },
                "images": [
                    {
                        "src": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
                        "alt": "Opal Pendant Necklace",
                        "is_primary": True
                    }
                ]
            }
        ]

        # Check if products already exist
        existing_products = db.query(models.Product).count()
        if existing_products == 0:
            for product_data in sample_products:
                product_create = schemas.ProductCreate(**product_data)
                crud.create_product(db=db, product=product_create)
            print(f"Created {len(sample_products)} sample products")
        else:
            print(f"Database already contains {existing_products} products")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
