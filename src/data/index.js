const modules = import.meta.glob([
  "./react.js",
  "./node.js",
  "./javascript.js",
  "./express.js",
  "./microservice.js",
]);

export const TECHNOLOGIES = [
  { name: "React", path: "./react.js" },
  { name: "Node.js", path: "./node.js" },
  { name: "JavaScript", path: "./javascript.js" },
  { name: "Express.js", path: "./express.js" },
  { name: "Microservices", path: "./microservice.js" },
];

const loaders = Object.fromEntries(
  TECHNOLOGIES.map(({ name, path }) => [name, modules[path]])
);

export const TABS = TECHNOLOGIES.map(({ name }) => name);

export async function loadTechnology(name) {
  const load = loaders[name];

  if (!load) {
    throw new Error(`Unknown technology: ${name}`);
  }

  const module = await load();

  return module.default;
}
