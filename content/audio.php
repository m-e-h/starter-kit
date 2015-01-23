<?php
/**
 * @package Abraham
 */

tha_entry_before(); ?>

  <article <?php hybrid_attr( 'post' ); ?>>

<?php
tha_entry_top();

    if ( is_singular( get_post_type() ) ) :

      get_template_part( 'partials/single', 'header' );

      get_template_part( 'partials/single', 'content' );

      get_template_part( 'partials/single', 'footer' );

    else : // If not viewing a single post.

    	get_template_part( 'partials/archive', 'header' );

      if ( has_excerpt() ) :

        get_template_part( 'partials/archive', 'content' );

      elseif ( empty( $audio ) ) :

        get_template_part( 'partials/single', 'content' );

      endif; // End excerpt/audio checks.

    	get_template_part( 'partials/archive', 'footer' );

    endif; // End single post check.

tha_entry_bottom(); ?>

  </article><!-- .entry -->

<?php
tha_entry_after();
