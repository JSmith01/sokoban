Algorythm to create nice level map
==================================

1. Add by 1 line on the every side
2. Fill outer space by some number (999)
3. Take only that number and inverse picture, resulting in fill inside level contour
4. Shift fill by 8 directions and sum it with itself, resulting by 1 cell thick border around - this should be grass
5. Run on the grass and create seashore outline.
6. Run on the walls and create nice corners
