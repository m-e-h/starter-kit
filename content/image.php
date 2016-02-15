<?php
/**
 * List of related articles.
 *
 * @package abraham
 */
?>
<section <?php hybrid_attr('post'); ?>>
	<?php
		get_the_image(array(
			'size' => 'abe-card-md',
			'link_to_post' => false,
			'image_class' => 'u-br u-block u-1of1',
		));
	?>
<div class="u-flex u-flex-column u-flex-justify-end u-text-white u-abs u-bottom0 u-left0 u-1of1 u-top0 u-color-inherit">
		<header <?php hybrid_attr('entry-header'); ?>>
			<h2 <?php hybrid_attr('entry-title'); ?>>
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h2>
		</header>

		<?php get_template_part('components/entry', 'footer'); ?>
</div>
</section>
