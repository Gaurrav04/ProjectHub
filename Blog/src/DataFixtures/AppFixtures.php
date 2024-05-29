<?php



namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('en_US');

        for ($i=1; $i<=5; $i++) {
            $category = new Category();
            $category->setTitle($faker->word);
            $manager->persist($category);
            // Add post
        for ($j= 1; $j <= 7; $j++) {
            $post = new Post(); 
            $post->setTitle($faker->sentence(nbWords:3));
            $post->setContent($faker->text( maxNbChars:500));
            $post->setCreatedAt($faker->dateTimeBetween(startDate: '-3 months')); 
            $post->setCategory($category);
            $manager->persist($post);
        }
    }
       
        $manager->flush();
    }
}
