/**
 * The Grow brain — anatomy shared by every brain on the site.
 * Paths are the app's own artwork (GROW V4.1 `src/ui/v41/BrainArt.tsx`).
 */

export type Sector = "physical" | "mental" | "life";
export const SECTORS: Sector[] = ["physical", "mental", "life"];

/** The shared SVG coordinate space. Every brain layer uses this viewBox so layers align. */
export const VIEWBOX = "0 8 440 452";

export const BRAIN_COLORS: Record<Sector, string> = {
  physical: "#16885c",
  mental: "#164b91",
  life: "#65a8cf",
};
export const BRAIN_INK: Record<Sector, string> = {
  physical: "#12573e",
  mental: "#123b70",
  life: "#245774",
};

export const SHAPES: Record<Sector, string> = {
  physical:
    "M230 38 C211 22 186 28 170 37 C141 36 118 49 103 67 C79 74 60 99 55 117 C35 136 27 160 29 182 C15 204 18 234 29 250 C24 273 37 300 60 306 C75 324 95 321 111 310 C122 292 132 274 151 266 C171 257 192 261 207 241 C221 226 231 214 230 193 C242 173 234 157 239 137 C245 114 239 97 242 78 C246 57 240 46 230 38",
  mental:
    "M249 40 C269 28 290 38 302 51 C324 51 341 65 348 83 C371 93 381 109 383 128 C402 142 408 162 405 182 C421 202 419 225 410 243 C416 269 402 289 387 301 C365 314 341 299 328 280 C311 260 296 258 280 247 C258 237 241 225 240 205 C246 183 239 164 246 145 C251 124 245 105 250 87 C245 69 239 52 249 40",
  life: "M111 313 C123 294 134 277 153 269 C174 262 195 266 210 246 C225 232 232 224 235 216 C247 233 262 243 280 251 C297 264 312 264 325 283 C340 304 365 319 385 307 C382 324 376 326 367 331 C387 336 383 355 372 366 C369 387 346 397 329 395 C306 407 285 394 266 394 C244 405 220 396 209 389 C184 398 164 389 154 377 C132 375 121 359 122 344 C103 329 113 307 125 299 C128 287 136 279 149 273",
};

export const FOLDS: Record<Sector, string[]> = {
  physical: [
    "M63 150 C62 125 84 111 99 111 C120 110 110 86 130 79 C144 75 157 82 164 64 C171 49 194 47 209 52",
    "M40 211 C40 188 64 185 76 168 C89 150 75 133 99 127 C120 121 129 139 143 127 C158 115 144 96 164 90 C184 84 208 99 215 78",
    "M51 272 C36 250 58 235 72 229 C88 222 95 207 91 190 C86 172 100 157 117 160 C140 164 143 149 155 141 C174 129 191 143 207 127",
    "M84 293 C74 278 91 262 110 261 C130 260 141 240 129 226 C113 208 128 186 146 190 C169 198 166 169 186 166 C207 163 222 177 214 194",
    "M147 246 C170 231 174 218 165 205 C158 195 170 189 183 194 C201 201 209 214 197 229",
  ],
  mental: [
    "M267 53 C287 49 301 72 300 86 C299 101 324 95 334 112 C344 127 333 146 350 151 C367 157 376 169 371 187",
    "M261 101 C275 86 286 111 283 127 C279 146 300 154 313 143 C331 128 313 115 317 105",
    "M259 164 C260 148 278 149 286 163 C296 181 281 195 299 204 C315 213 336 194 331 179 C327 165 344 164 355 172",
    "M263 212 C280 230 297 216 312 227 C328 237 323 258 344 259 C362 260 365 235 351 224 C340 214 361 202 374 211 C392 224 391 244 381 254",
    "M358 285 C382 289 400 268 395 248",
  ],
  life: [
    "M130 320 C142 300 166 314 179 298 C192 282 204 297 217 289 C234 273 249 275 262 290 C276 306 298 295 308 311",
    "M138 349 C156 362 177 353 182 337 C187 320 208 319 221 331 C235 345 252 338 260 323 C269 307 285 319 292 332 C304 350 329 331 345 337",
    "M171 369 C185 383 203 367 216 372 C234 382 245 371 254 360 C266 346 281 356 290 368 C300 382 325 372 339 361",
  ],
};

export const CENTERS: Record<Sector, [number, number]> = {
  physical: [135, 174],
  mental: [330, 174],
  life: [245, 330],
};

/** [top, bottom] of each sector in user space — the water travels between them. */
export const BOUNDS: Record<Sector, [number, number]> = {
  physical: [30, 322],
  mental: [35, 308],
  life: [216, 403],
};

/** Direction each sector moves when the brain separates (unit-ish vectors). */
export const EXPLODE: Record<Sector, [number, number]> = {
  physical: [-1, -0.45],
  mental: [1, -0.45],
  life: [0.08, 1],
};

/** Where each label's leader line meets its sector (% of the brain box). Label dots are measured live. */
export const LABEL_ANCHORS: Record<Sector, [number, number]> = {
  physical: [27, 23],
  mental: [73, 23],
  life: [38, 79],
};

/** Map a viewBox point to a percentage of the brain box. */
export function toPercent([x, y]: [number, number]): [number, number] {
  return [(x / 440) * 100, ((y - 8) / 452) * 100];
}
