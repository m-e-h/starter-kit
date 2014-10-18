<?php
/**
 * The main forum template file.
 *
 * @package Abraham
 */

get_header(); ?>

<main id="content" class="content layout__item">

	<?php hybrid_get_menu( 'forum-views' ); // Loads the menu/forum-views.php template. ?>

	<?php abraham_loop_meta(); ?>

	<?php $forums = mb_get_sub_forums(); ?>

	<?php if ( !empty( $forums ) ) : ?>

		<div class="layout">

			<div>

			<?php foreach ( $forums as $forum ) : ?>

				<div>
					<div>

<a class="forum-link" href="<?php mb_forum_url( $forum->term_id ); ?>"><?php mb_forum_title( $forum->term_id ); ?></a>
<div class="entry-meta">
<?php mb_list_forums( array( 'parent' => $forum->term_id, 'wrap' => '<ul style="margin-bottom:0;" %s>%s</ul>' ) ); ?>
</div>

</div>
					<div class="num"><?php mb_forum_topic_count( $forum->term_id ); ?></div>
				</div>

			<?php endforeach; ?>

			</div>
		</div>


	<?php endif; ?>


	<?php if ( have_posts() ) : ?>

		<div class="layout">
					<div>
						<?php if ( current_user_can( 'create_forum_topics' ) ) : ?>
						<a href="<?php mb_topic_form_url(); ?>" class="new-topic">New Topic <i class="fa fa-plus-circle"></i></a>
						<?php endif; ?>
					</div>

			<div class="all-1">

		<?php while ( have_posts() ) : ?>

			<?php the_post(); ?>

				<div class="layout  board-topic <?php echo mb_is_topic_sticky() ? 'sticky' : ''; ?>">
					<a class="topic-link layout__item" href="<?php mb_topic_url(); ?>">
						<h4><?php mb_topic_title(); ?></h4>
						<div class="entry-meta">

							<?php mb_topic_labels(); ?>

Last post

<?php mb_topic_last_active_time( get_the_ID() ); ?> ago by
<?php mb_topic_last_poster( get_the_ID() ); ?>

						</div><!-- .entry-meta -->
					<div class="post-num">
						<span class="num"><?php mb_topic_post_count( get_the_ID() ); ?></span>
					</div>
					</a>
				</div>
		<?php endwhile; // End found posts loop. ?>

			</div>
		</div>

				<?php abraham_loop_nav(); ?>

		<?php else : ?>

			<?php get_template_part( 'content/error' ); ?>

	<?php endif; // End check for posts. ?>

	<?php if ( function_exists( 'mb_topic_form' ) ) mb_topic_form(); ?>

</main><!-- #main -->

<?php hybrid_get_sidebar( 'secondary' ); ?>

<?php get_footer(); ?>